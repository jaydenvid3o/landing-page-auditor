import React, { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"

const TaskManager = () => {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])

  const addTask = () => {
    if (task.trim() === "") return
    setTasks([...tasks, { id: Date.now(), text: task, completed: false }])
    setTask("")
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  return (
    <Card className="max-w-md mx-auto my-8">
      <CardHeader>
        <CardTitle>Task List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input
            value={task}
            onChange={e => setTask(e.target.value)}
            placeholder="Add a task"
          />
          <Button onClick={addTask}>Add</Button>
        </div>
        <ul className="space-y-2">
          {tasks.map(t => (
            <li key={t.id} className="flex items-center gap-2">
              <Checkbox
                checked={t.completed}
                onChange={() => toggleTask(t.id)}
              />
              <span className={`text-sm ${t.completed ? "line-through text-slate-500" : ""}`}>{t.text}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default TaskManager

