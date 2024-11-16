import React, { useState, useEffect } from "react"
import api from "./services/api"
import Note from "./components/Note"
import RadioButton from "./components/RadioButton"

export default function App() {
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [allNotes, setAllNotes] = useState([])
  const [selectedValue, setSelectedValue] = useState('all')

  useEffect(() => {
    getAllNotes()
  }, [])

  async function getAllNotes() {
    const response = await api.get('/annotations',)
    setAllNotes(response.data)
  }

  async function loadNotes(option) {
    const params = { priority: option }
    const response = await api.get('/priorities', { params })

    if (response)
      setAllNotes(response.data)
  }

  function handleChange(e) {
    setSelectedValue(e.value)
    if (e.checked && e.value !== 'all') 
      loadNotes(e.value)
    else 
      getAllNotes()
  }

  async function handleDelete(id) {
    const deletedNote = await api.delete(`/annotations/${id}`)

    if (deletedNote)
      setAllNotes(allNotes.filter(note => note._id !== id))
  }

  async function handleChangePriority(id) {
    const note = await api.post(`/priorities/${id}`)

    if (note && selectedValue !== 'all') 
      loadNotes(selectedValue)
    else if (note)
      getAllNotes()

      
  }

  async function handleSubmit (e) {
    e.preventDefault()
    
    const response = await api.post('/annotations', {
        title,
        note,
        priority: false
    })

    setNote('')
    setTitle('')

    if (selectedValue !== 'all')
      getAllNotes()
    else
      setAllNotes([...allNotes, response.data])

    setSelectedValue('all')
  }

  useEffect(() => {
    function enableSubmitButton() {
      const submitButton = document.querySelector('button[type="submit"]')
      if (title && note) {
        submitButton.removeAttribute('disabled')
      } else {
        submitButton.setAttribute('disabled', true)
      }
    }
    enableSubmitButton()
  }, [title, note])

  return (
    <div id="app" className="w-screen h-screen max-w-[1420px] my-0 mx-auto py-16 px-8 flex flex-row items-start overflow-x-hidden bg-zinc-900 text-zinc-50 font-poppins transition-all selection:bg-violet-900/90 selection:text-zinc-50 max-md:flex-col">
      <aside className="w-[360px] mb-8 bg-zinc-800 shadow-xl rounded-lg py-8 px-5 flex flex-col fixed max-md:relative max-md:w-full">
        <strong className="text-2xl text-center font-extrabold text-zinc-200 italic select-none pb-6 block">Notes</strong>
        <form className="" onSubmit={handleSubmit}>
          <div className="">
            <label htmlFor="title" className="text-base font-medium text-zinc-200 block">Título da Anotação</label>
            <input className="w-full h-8 font-base bg-zinc-800 border-b-2 border-b-zinc-200 text-zinc-300 caret-zinc-200" value={title} onChange={e => setTitle(e.target.value)} maxLength={32} required />
          </div>
          <div className="">
            <label htmlFor="note" className="text-base font-medium text-zinc-200 block mt-5">Anotação</label>
            <textarea className="mt-2 w-full h-52 text-zinc-300 font-base text-base bg-zinc-800 border-b-2 border-b-zinc-200 caret-zinc-200 resize-none" value={note} onChange={e => setNote(e.target.value)} required />
          </div>
          <button type="submit" className="w-full border-none mt-6 rounded-lg py-4 px-5 text-base font-semibold text-zinc-200 cursor-pointer bg-violet-900/80 shadow-lg shadow-violet-950/50 hover:bg-violet-800 hover:shadow-xl hover:shadow-violet-900/60 transition-all ease-in-out disabled:bg-violet-950/40 disabled:shadow-none">Salvar</button>
        </form>
        <RadioButton selectedValue={selectedValue} handleChange={handleChange}/>
      </aside>
      <main className="flex-1 ml-96 max-md:ml-0 max-md:mt-8 max-md:w-full">
        <ul className="grid grid-cols-2 gap-5 list-none max-oneCol:grid-cols-1 max-md:w-full">
          {
            allNotes.map(data => (
              <Note key={data._id} data={data} handleDelete={handleDelete} handleChangePriority={handleChangePriority} />
            ))
          }
        </ul>
      </main>
    </div>
  )
}