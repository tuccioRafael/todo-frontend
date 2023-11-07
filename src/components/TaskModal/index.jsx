import { Button, Modal, Form, Input } from "antd"


export const TaskModal = ({ taskId, open, onCancel, form, onFinish}) => {
    return (
        <Modal title={taskId ? 'Editar a tarefa' : 'Criar a tarefa'}
                open={open}
                onCancel={onCancel}
                footer={[
                    <Button key="back" onClick={onCancel}>
                        Cancelar
                    </Button>,
                    <Button key="submit" type="primary" onClick={form.submit}>
                        Salvar
                    </Button>
                ]}>
                <Form form={form} onFinish={onFinish} layout='vertical'>
                    <Form.Item name="name"
                        label="Descreva a tarefa"
                        rules={[{ required: true,
                        min: 5,
                        message: 'A descrição deve ter no minimo 5 characteres' }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
    )
}