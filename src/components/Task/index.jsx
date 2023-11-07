import { List, Badge, Card, Tooltip, Popconfirm } from 'antd';
import { EditOutlined, CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons';


export const Task = ({ task, onCompleteTask, onEditTask, onDeleteTask, testId }) => {
    return (
        <List.Item>
            <Badge.Ribbon text={task.done ? "Concluída" : "A fazer"} color={task.done ? '' : 'grey'}>
                <Card
                    actions={[
                        <Tooltip placement="top" title='Concluir' arrow={true} >
                            <CheckCircleOutlined key="done" onClick={() => onCompleteTask(task._id, task.done)}/>
                        </Tooltip>,
                        <Tooltip placement="top" title='Editar' arrow={true}>
                            <span id='editar-task' data-testid="teste">
                                <EditOutlined key="edit"
                                data-testid={"EDITAR"}
                                onClick={() => {
                                    onEditTask(task)
                                    
                                }} />

                            </span>
                        </Tooltip>,
                        <Popconfirm
                            title="Excluir a tarefa"
                            description="Você deseja excluir essa tarefa?"
                            onConfirm={() => onDeleteTask(task._id)}
                            okText="Sim"
                            cancelText="Não">
                            <Tooltip placement="top" title='Excluir' arrow={true}>
                                <DeleteOutlined key="delete" data-testid={"EXCLUIR"}/>
                            </Tooltip>
                        </Popconfirm>,
                    ]}>
                    {task.name}
                </Card>
            </Badge.Ribbon>
        </List.Item>
    )
}