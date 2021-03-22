import { Modal } from "antd";
import React, { ReactNode } from "react";
export type ModalWithOptionsProps = {
  isModalVisible: boolean;
  handleOk?: () => void;
  handleCancel?: () => void;
  children: ReactNode;
  title?: string;
  footer?: ReactNode;
};
export const ModalWithOptions = ({ children, handleCancel, handleOk, isModalVisible, footer, title }: ModalWithOptionsProps) => {
  return (
    <Modal title={title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={footer}>
      {children}
    </Modal>
  );
};
