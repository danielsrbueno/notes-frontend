import { useState } from "react"
import api from "../services/api"

export default function Note({ data, handleDelete, handleChangePriority }) {
    const [changedNote, setChangedNote] = useState('')
    let color = data.priority ? "bg-violet-500" : "bg-zinc-800"

    async function handleSave(e, note) {
        e.style.cursor = 'default'
        if (changedNote && changedNote !== note) {
          await api.post(`/contents/${data._id}`, { note: changedNote })  
        }
    }

    function handleEdit(e) {
        e.style.cursor = 'text'
    }
    
    return (
        <li className={"shadow-xl rounded-xl p-5 pb-3 min-w-80 max-md:w-full " + color}>
            <div className="flex justify-between">
                <strong className="block text-lg text-zinc-200">{data.title}</strong>
                <div className="bg-violet-900/60 text-zinc-300/80 font-bold text-center items-center w-6 h-6 rounded-full cursor-pointer hover:bg-violet-800 hover:text-zinc-50 hover:shadow hover:shadow-violet-900/60 transition-all ease-in-out select-none" onClick={() => handleDelete(data._id)}>x</div>
            </div>
            <textarea className={"p-2 my-2 w-full h-32 text-base text-zinc-300 font-base border-b-2 border-b-zinc-200 caret-zinc-200 resize-none cursor-default " + color + (data.priority ? " font-medium text-zinc-50 " : " ")} defaultValue={data.note} onChange={e => setChangedNote(e.target.value)} onClick={e => handleEdit(e.target)} onBlur={e => handleSave(e.target, data.note)}></textarea>
            <span className="bg-violet-900/60 text-zinc-300/80 font-black text-center items-center w-5 h-6 rounded-full cursor-pointer hover:bg-violet-800 hover:text-zinc-50 hover:shadow hover:shadow-violet-900/60 transition-all ease-in-out block select-none" onClick={() => handleChangePriority(data._id)}>!</span>
        </li>
    )
}