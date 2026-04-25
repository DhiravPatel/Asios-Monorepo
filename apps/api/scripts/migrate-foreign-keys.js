#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * One-time migration: convert string-based foreign keys to ObjectId refs.
 *
 * Existing rows store the parent's NAME in the FK field (e.g. SubCategory.category
 * holds the Category name string). After the schema change, those fields must
 * hold the parent's _id. Run this script ONCE against any DB that pre-dates
 * the FK refactor.
 *
 * Usage:
 *   cd apps/api
 *   node scripts/migrate-foreign-keys.js              # dry run by default
 *   node scripts/migrate-foreign-keys.js --apply      # actually write
 *
 * Idempotent: rows whose FK is already a valid ObjectId are skipped.
 */

const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config({ path: path.join(__dirname, '..', '.env') })

const Category = require('../Model/Category')
const SubCategory = require('../Model/SubCategory')
const { Product } = require('../Model/Product.js')
const Catalogue = require('../Model/Catalogue')
const CatalogueCategory = require('../Model/CatalogueCategory')
const CatalogueSubCategory = require('../Model/CatalogueSubCategory')

const APPLY = process.argv.includes('--apply')

function isLikelyObjectId(value) {
  if (!value) return false
  if (value instanceof mongoose.Types.ObjectId) return true
  return typeof value === 'string' && /^[0-9a-fA-F]{24}$/.test(value)
}

async function buildLookup(Model, nameField) {
  const docs = await Model.collection.find({}).toArray()
  const map = new Map()
  for (const doc of docs) {
    if (doc[nameField]) map.set(String(doc[nameField]).trim(), doc._id)
  }
  return map
}

async function migrateCollection({ Model, label, fields }) {
  const coll = Model.collection
  const all = await coll.find({}).toArray()
  let toUpdate = 0
  let alreadyOk = 0
  let unresolved = 0

  for (const doc of all) {
    const update = {}
    let needs = false

    for (const { field, lookup, parentLabel } of fields) {
      const current = doc[field]
      if (current == null) continue
      if (isLikelyObjectId(current)) {
        // Already migrated (or was already ObjectId).
        continue
      }
      const key = String(current).trim()
      const id = lookup.get(key)
      if (!id) {
        console.warn(
          `  [${label}] doc ${doc._id} field "${field}"="${key}" — no matching ${parentLabel} found; leaving as-is`
        )
        unresolved++
        continue
      }
      update[field] = id
      needs = true
    }

    if (!needs) {
      alreadyOk++
      continue
    }

    toUpdate++
    if (APPLY) {
      await coll.updateOne({ _id: doc._id }, { $set: update })
    }
  }

  console.log(
    `  [${label}] ${all.length} total → ${toUpdate} ${
      APPLY ? 'updated' : 'would-update'
    }, ${alreadyOk} already ok, ${unresolved} unresolved`
  )
}

async function main() {
  const uri = process.env.DB_URI
  if (!uri) {
    console.error('DB_URI is not set in .env')
    process.exit(1)
  }

  console.log(`Mode: ${APPLY ? 'APPLY (writes)' : 'DRY RUN (no writes — pass --apply to commit)'}`)
  console.log('Connecting to MongoDB...')
  await mongoose.connect(uri)
  console.log('Connected.\n')

  console.log('Building name → _id lookups...')
  const categoryByName = await buildLookup(Category, 'category')
  const subCategoryByName = await buildLookup(SubCategory, 'subcategory')
  const catalogueCategoryByName = await buildLookup(CatalogueCategory, 'cataloguecategory')
  const catalogueSubCategoryByName = await buildLookup(
    CatalogueSubCategory,
    'cataloguesubcategory'
  )
  console.log(
    `  Category: ${categoryByName.size}, SubCategory: ${subCategoryByName.size}, CatalogueCategory: ${catalogueCategoryByName.size}, CatalogueSubCategory: ${catalogueSubCategoryByName.size}\n`
  )

  console.log('Migrating SubCategory.category...')
  await migrateCollection({
    Model: SubCategory,
    label: 'SubCategory',
    fields: [{ field: 'category', lookup: categoryByName, parentLabel: 'Category' }],
  })

  console.log('Migrating Product.category and Product.subcategory...')
  await migrateCollection({
    Model: Product,
    label: 'Product',
    fields: [
      { field: 'category', lookup: categoryByName, parentLabel: 'Category' },
      { field: 'subcategory', lookup: subCategoryByName, parentLabel: 'SubCategory' },
    ],
  })

  console.log('Migrating CatalogueSubCategory.cataloguecategory...')
  await migrateCollection({
    Model: CatalogueSubCategory,
    label: 'CatalogueSubCategory',
    fields: [
      {
        field: 'cataloguecategory',
        lookup: catalogueCategoryByName,
        parentLabel: 'CatalogueCategory',
      },
    ],
  })

  console.log('Migrating Catalogue.cataloguecategory and Catalogue.cataloguesubcategory...')
  await migrateCollection({
    Model: Catalogue,
    label: 'Catalogue',
    fields: [
      {
        field: 'cataloguecategory',
        lookup: catalogueCategoryByName,
        parentLabel: 'CatalogueCategory',
      },
      {
        field: 'cataloguesubcategory',
        lookup: catalogueSubCategoryByName,
        parentLabel: 'CatalogueSubCategory',
      },
    ],
  })

  console.log('\nDone.')
  await mongoose.disconnect()
}

main().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
