import { TodoController } from '@/controllers/todo';
import { Todo } from '@/models/todo';
import { computed, ref, Ref } from 'vue';

export const unfilteredAllTodos: Ref<Todo[]> = ref([])
export const dataHasLoaded = ref(false)
export const todos = computed(() => {
    const newTodos: {
        backlog: Todo[],
        wip: Todo[],
        done: Todo[]
      } = {
        backlog: [],
        wip: [],
        done: []
      }

    unfilteredAllTodos.value.forEach(todo => newTodos[todo.status].push(todo))

    return newTodos
  })
  


export async function fetchKanbanData() {
  unfilteredAllTodos.value = await TodoController.getAll()
  dataHasLoaded.value = true
}