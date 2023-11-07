import { useEffect, useState } from 'react';
import { Layout, Divider, List, Form, message } from 'antd';
import TaskUseStore from '../../services/taskUseStore';
import { Navbar } from '../../components/Navbar';
import { Task } from '../../components/Task';
import { TaskModal } from '../../components/TaskModal';
import { TaskPageStyle } from './TaskPageStyle';

const TaskPage = () => {

    const [openModal, setOpenModal] = useState(false);
    const [taskId, setTaskId] = useState();
    const { Content } = Layout;
    const { getAllTasks, tasks, loading, deleteTask, doneTask, updateTask, createTask } = TaskUseStore();
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        getAllTasks();
    }, [getAllTasks, loading]);

    const handleDelete = async (id) => {
        const result = await deleteTask(id)
        result.status === 200 ? messageApi.open({
            type: 'success',
            content: 'Tarefa excluída com sucesso!',
        }) : messageApi.open({
            type: 'error',
            content: 'Erro no servidor! Tente novamente mais tarde!',
        });
    }

    const handleCompeteTask = async (id, done) => {
        if (done) {
            messageApi.open({
                type: 'warning',
                content: 'Esta tarefa já está concluída!',
            });
            return
        }
        const result = await doneTask(id, { done: true });
        result.status === 200 ? messageApi.open({
            type: 'success',
            content: 'Tarefa concluída com sucesso!',
        }) : messageApi.open({
            type: 'error',
            content: 'Erro no servidor! Tente novamente mais tarde!',
        });
    }

    const handleEdit = (task) => {
        if (task.done) {
            messageApi.open({
                type: 'warning',
                content: 'Não é possível editar uma tarefa concluída.',
            });
            return;
        }
        setTaskId(task._id);
        form.setFieldValue('name', task.name)
        setOpenModal(true);
    }

    const handleSubmit = async () => {
        if (taskId) {
            const result = await updateTask(taskId, { name: form.getFieldValue('name') })
            setTaskId();
            if (result.status === 200) {
                messageApi.open({
                    type: 'success',
                    content: 'Tarefa editada com sucesso!',
                });

            }
        } else {
            const result = await createTask({ name: form.getFieldValue('name') });
            if (result.status === 201) {
                messageApi.open({
                    type: 'success',
                    content: 'Tarefa criada com sucesso!',
                });

            }
        }
        setOpenModal(false);
        form.resetFields();
    }

    const handleCloseModal = () => {
        setOpenModal(false);
        setTaskId();
        form.resetFields();
    }

    return (
        <TaskPageStyle>
            <Layout>
                {contextHolder}
                <Navbar onClick={() => setOpenModal(true)} />
                <Content className='container'>
                    <Divider orientation="left" >Tarefas</Divider>
                    <List
                        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 5, xxl: 6 }}
                        dataSource={tasks}
                        renderItem={(item) => (
                            <Task task={item}
                                onCompleteTask={handleCompeteTask}
                                onDeleteTask={handleDelete}
                                onEditTask={handleEdit} />
                        )}
                    />
                </Content>
                <TaskModal open={openModal}
                    onCancel={handleCloseModal}
                    onFinish={handleSubmit}
                    form={form} taskId={taskId} />
            </Layout>
        </TaskPageStyle>
    );
};
export default TaskPage;

