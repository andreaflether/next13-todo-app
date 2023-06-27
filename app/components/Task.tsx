"use client"

import { ITask } from '@/types/tasks'
import { FormEventHandler, useState } from 'react'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import Modal from './Modal'
import { useRouter } from 'next/navigation'
import { editTodo, deleteTodo } from '@/api'

interface TaskProps {
  task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter()
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text)

  const handleEditTodo: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    await editTodo({
      id: task.id,
      text: taskToEdit
    })
    setOpenModalEdit(false)
    router.refresh()
  }

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id)
    setOpenModalDelete(false)
    router.refresh()
  }

  return (
    <tr key={task.id}>
      <td className="w-full">{task.text}</td>
      <td className="flex gap-2">
        <FiEdit cursor="pointer" 
                className="text-blue-500"
                size={21}
                onClick={() => setOpenModalEdit(true) }
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleEditTodo}>
            <h3 className="font-bold text-lg">Edit task</h3>
            <div className="modal-action">
              <input type="text"
                    value={taskToEdit}
                    onChange={event => setTaskToEdit(event.target.value)}
                    placeholder="Todo"
                    className="input input-bordered w-full" />
              <button type="submit" className="btn btn-neutral">Save</button>
            </div>
          </form>
        </Modal>
        <FiTrash2 cursor="pointer" 
                  className="text-red-500"
                  size={21}
                  onClick={() => setOpenModalDelete(true)}
        />
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <h3 className="text-lg">Are you sure you want to delete this task?</h3>
          <div className="modal-action">
            <button className="btn btn-neutral" onClick={() => handleDeleteTask(task.id)}>Yes</button>
            <button className="btn" onClick={() => setOpenModalDelete(false)}>No</button>
          </div>
        </Modal>
      </td>
    </tr>
  )
}

export default Task