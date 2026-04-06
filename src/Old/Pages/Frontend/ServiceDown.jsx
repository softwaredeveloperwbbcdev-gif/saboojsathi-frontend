import AdminAuthenticatedLayout from "@/Components/AdminAuthenticatedLayout";
import Modal from '@/Components/Modal';
import MsgDisplayModal from '@/Components/MsgDisplayModal'
import React, { useState } from 'react'


const ServiceDown = ({message}) => {
  console.log(message);
  const [isModalOpen, setIsModalOpen] = useState(true);
  
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
  return (
    <>
    <AdminAuthenticatedLayout stake_cd="0701"></AdminAuthenticatedLayout>
    <Modal
                show={isModalOpen}
                onClose={handleCloseModal}
                maxWidth="xl"
                closeable={true}
            >
            <MsgDisplayModal msg={message}/>
    </Modal>
            </>
    
  )
}

export default ServiceDown