import { create } from "zustand";
import { api } from "./api";


const TaskUseStore = create((set) => ({
    tasks: [],
    task: null,
    loading: false,
    async getAllTasks() {
        try {
            const { data } = await api.get('/tasks');
            set({ tasks: data });
        } catch (err) {
            console.log(err);
        } finally {
           
        }
    },

    async createTask(name) {
        try {
            set({ loading: true })
            
           return await api.post('tasks', name);
        } catch (error) {
            console.error(error);
        } finally {
            set({ loading: false });
        }
    },
    async deleteTask(id){
        try {
            set({ loading: true })
            return await api.delete(`/tasks/${id}`)
        } catch (err) {
            console.error(err);
        } finally {
            set({ loading: false })
        }
    },
    async updateTask(id, name){
        try {
            set({ loading: true})
            return await api.put(`/tasks/${id}`, name)
        } catch (err) {
            console.error(err)
        } finally {
            set({ loading: false})
        }
    },
    async doneTask (id, done) {
        try {
            set({ loading: true})
            return await api.patch(`/tasks/${id}`, done)
        } catch (err) {
            console.error(err)
        } finally {
            set({ loading: false})
        }
    },
    async findOneTask(id){
        try {
            const { data } = await api.get(`/tasks/${id}`);
            set({task : data});
            return data;
        } catch (err) {
            console.error(err)
        }
    }
}));


export default TaskUseStore;