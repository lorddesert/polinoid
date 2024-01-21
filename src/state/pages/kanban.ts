import { TodoController } from '@/controllers/todo';
import { Todo } from '@/models/todo';
import { ref, Ref } from 'vue';

export const unfilteredAllTodos: Ref<Todo[]> = ref([])

export const todos: Ref<{
  backlog: Todo[],
  wip: Todo[],
  done: Todo[]
}> = ref({
  backlog: [],
  wip: [],
  done: []
})

export async function fetchKanbanData() {
  const newTodos = todos.value
  unfilteredAllTodos.value = await TodoController.getAll()
  unfilteredAllTodos.value.forEach(todo => newTodos[todo.status].push(todo))

  todos.value = newTodos
}


