"use client"

import { AiOutlinePlus } from 'react-icons/ai'
import Modal from './Modal'
import { FormEventHandler, useState } from 'react'
import { addTodo } from '@/api'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

const AddTask = () => {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [newTaskValue, setNewTaskValue] = useState<string>('')

  const handleNewTodo: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    await addTodo({
      id: uuidv4(),
      text: newTaskValue
    })
    setNewTaskValue('')
    setModalOpen(false)
    router.refresh()
  }

  return (
    <>
      <button onClick={() => setModalOpen(true)}
        className="btn btn-primary w-1/2 justify-center">
        <AiOutlinePlus size={18} className="mr-2" />
        Add new task
      </button>
    
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleNewTodo}>
          <h3 className="font-bold text-lg">Add new task</h3>
          <div className="modal-action">
            <input type="text"
                   value={newTaskValue}
                   onChange={event => setNewTaskValue(event.target.value)}
                   placeholder="Todo"
                   className="input input-bordered w-full" />
            <button type="submit" className="btn btn-neutral">Save</button>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default AddTask