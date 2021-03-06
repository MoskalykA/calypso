import { useEffect, useState, useRef } from "react"
import { invoke } from "@tauri-apps/api/tauri"
import { Link, useParams } from "react-router-dom"
 
function Update() {
    const { id } = useParams()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const refName = useRef<HTMLInputElement>(null)
    const refDescription = useRef<HTMLTextAreaElement>(null)
    useEffect(() => {
        invoke("request_idea_by_id", {
            id: Number(id)
        }).then((data: any) => {
            refName.current!.value = data.name
            refDescription.current!.value = data.description
    
            setName(data.name)
            setDescription(data.description)
        })
    }, [])

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-zinc-800/50 w-11/12 rounded-md cool-border flex flex-col">
                <div className="m-4 space-y-4">
                    <div>
                        <h1 className="font-mono">Name</h1>
                        <input ref={refName} onChange={(e) => {
                            setName(e.target.value)
                        }} className="p-1 w-full bg-zinc-900 cool-border rounded font-mono text-white focus:outline-0" type="text"/>
                    </div>

                    <div>
                        <h1 className="font-mono">Description</h1>
                        <textarea rows={8} ref={refDescription} onChange={(e) => {
                            setDescription(e.target.value)
                        }} className="p-1 w-full bg-zinc-900 cool-border rounded font-mono text-white focus:outline-0"/>
                    </div>
                </div>

                <div className="flex justify-center items-center">
                    <Link to={"/ideas/index"} onClick={() => {
                        invoke("update_idea", {
                            id: Number(id),
                            name,
                            description
                        })
                    }} className="cool-button font-mono mb-4 px-4">
                        <h1>Update</h1> 
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Update