import { TodoApi } from "../redux/store"
import { Todo } from "../redux/store"
import { useCallback, useRef, useState } from "react";

type BoxPropsTypes = {
  element: Todo,
  key: number
}

type UpdateFormPropsTypes = {
  setShowUpdateForm: React.Dispatch<React.SetStateAction<boolean>>,
  element: Todo
}

const UpdateForm = ({setShowUpdateForm, element}: UpdateFormPropsTypes) => {
  // ref
  const UpdateInputRef = useRef<HTMLInputElement>(null);

  // redux
  const [UpdateTodo] = TodoApi.useUpdateTodoMutation();

  // expression
  const handleUpdate = useCallback(() => {
    if (UpdateInputRef.current!.value) {
      UpdateTodo({
        id: element.id,
        message: UpdateInputRef.current!.value
      })
    }
    UpdateInputRef.current!.value = "";
    setShowUpdateForm(pre => !pre);
  }, [UpdateTodo])

  return (
    <section className="UpdateForm">
      <input type="text" ref={UpdateInputRef} />
      <button onClick={handleUpdate}>Confirm</button>
    </section>
  )
}

const Box = ({element, key}: BoxPropsTypes) => {

  // redux
  const [DeleteTodo] = TodoApi.useDeleteTodoMutation();

  // states
  const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);

  // expression
  const handleDelete = useCallback((element: Todo) => {
    DeleteTodo(element);
  },[DeleteTodo])

  return (
    <section className="Box">
      <h3>{element.message}</h3>
      <button onClick={() => handleDelete(element)}>Delete</button>
      { showUpdateForm ? <UpdateForm element={element} setShowUpdateForm={setShowUpdateForm} /> : <button onClick={() => setShowUpdateForm(pre => !pre)}>Update</button> }
    </section>
  )
}

export const DisplayBox: React.FC = () => {

  // redux
  const { data: todos } = TodoApi.useFetchAllQuery();
  const [AddTodo] = TodoApi.useAddTodoMutation();

  // ref
  const AddInputRef = useRef<HTMLInputElement>(null);

  // expression
  const ToggleAdd = useCallback(() => {
    if (AddInputRef.current!.value) {
      AddTodo(AddInputRef.current!.value);
    }
    AddInputRef.current!.value = "";
  }, [AddTodo])

  return (
    <section className="DisplayBox">
      {
        todos?.map(element => <Box element={element} key={element.id} />)
      }
      <section className="Input">
        <input type='text' ref={AddInputRef} />
        <button onClick={ToggleAdd}>Add</button>
      </section>
    </section>
  )
}