import { Input, Modal, message } from 'antd';
import React, { useState } from 'react';
import { useAddCatalogueCategory } from '../../hooks/Catalogue/CatalogueCategoryHook';

const AddCatelougeCategory = ({ visible, onClose }) => {
    const [cataloguecategory, setCatalogueCategory] = useState('');
    const { mutate: addCatalogueCategory } = useAddCatalogueCategory();

    const handleOk = async () => {
        try {
            await addCatalogueCategory({ cataloguecategory });
            message.success('Catalogue Category added successfully!');
            onClose();
        } catch (error) {
            message.error(`Error adding category: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <Modal
            title="Add New Catalogue Category"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <div className="flex flex-col space-y-4 mt-5">
                <div className="flex items-center gap-3">
                    <span className="w-36">Category:</span>
                    <Input
                        type="text"
                        placeholder="Enter category here"
                        value={cataloguecategory}
                        onChange={(e) => setCatalogueCategory(e.target.value)}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default AddCatelougeCategory;
