import react, { useState, useEffect } from 'react'
import './ToDo.css'

const getdata = () => {
    const list = localStorage.getItem("todo")
    if (list) {
        return JSON.parse(list)
    }
    else {
        return []
    }


}
const ToDo = () => {
    const [input, setInput] = useState()
    const [items, setItems] = useState(getdata())
    const [editItem,setEditItem]=useState("")
    const [toggleButton,setToggleButton]=useState(false)
    const addData = () => {
        if (!input) {

        }
        else if(input && toggleButton){
            setItems(
                items.map((curElem)=>{
                    if(curElem.id===editItem){
                        return {...curElem,name:input}

                    }
                    return curElem
                })
            )
            setInput([])
        setEditItem(null)
        setToggleButton(false)
        }
        else {
            const newInput={
                id:new Date().getTime().toString(),
                name:input,
            }
            setItems([...items, newInput])
            setInput('')
        }

    }
    const deleteItem = (index) => {
        const deletedItem=items.filter((curElem)=>{
            return curElem.id!==index
        })
        console.log(deletedItem)

       
        setItems(deletedItem)

    }

    useEffect(() => {
        localStorage.setItem("todo", JSON.stringify(items))
    }, [items])

     const updateData = (idx) => {
        const editItem = items.find((curElem)=>{
            return curElem.id===idx
        })
        setInput(editItem.name)
        setEditItem(idx)
        setToggleButton(true)
     }


    return (
        <>
            <div className="main-div">
                <div className='child-div'>
                    <figure>
                        <img src="https://media.istockphoto.com/id/1193476717/photo/male-hands-making-a-to-do-list-in-a-notebook-over-an-office-desk.webp?b=1&s=170667a&w=0&k=20&c=p7MUCCTnL9eCmBr0FEBNs_4GFPg7yniFVz3m94k5OQQ=" alt="" className='child-div figure img' />
                        <figcaption>Add your list here</figcaption>
                    </figure>
                    <div className='addItems'>
                        <input type="text" className='form-control' placeholder="add Items"
                            value={input} onChange={(e) => setInput(e.target.value)
                            } />
                            {
                                toggleButton?(<i className="far fa-edit add-btn" onClick={() => addData()}></i>):
                            (<i className="fa fa-plus add-btn" onClick={() => addData()}></i>)
                        
                            }
                    </div>

                    <div className='showItems'>
                        {
                            items.map((curElem) => {
                                return (
                                    <div className='eachItem' key={curElem.id}>
                                        <h3>{curElem.name}</h3>
                                        <div className='todo-btn'>
                                            <i className="far fa-edit add-btn" onClick={() => updateData(curElem.id)}></i>
                                            <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(curElem.id)}></i>
                                        </div>
                                    </div>
                                )

                            })}

                    </div>

                    <div className='showItems'><button className='btn effect04' data-sm-link-text="Remove All" onClick={() => setItems([])}><span>CHECK LIST</span></button></div>
                </div>
            </div>
        </>
    )
}

export default ToDo