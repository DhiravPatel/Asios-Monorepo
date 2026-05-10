const express = require('express')
const router = express.Router()
const { GetDashboardStats } = require('../Controller/Dashboard.js')

// Admin-only stats endpoint. Browser-cache for 30s — admin reloads less than that
// won't hit the DB at all.
router.get('/stats', GetDashboardStats)

module.exports = router
