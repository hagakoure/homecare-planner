import {createBrowserRouter, RouteObject} from 'react-router-dom';
import {App} from './App';
import {HomePage} from './pages/HomePage';
import {TasksPage} from './pages/TasksPage';
import {NotesPage} from './pages/NotesPage';
import {AgronomyPage} from './pages/AgronomyPage';

const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>,
        children: [
            {index: true, element: <HomePage/>},
            {path: 'tasks', element: <TasksPage/>},
            {path: 'notes', element: <NotesPage/>},
            {path: 'agronomy', element: <AgronomyPage/>},
        ],
    },
];

export const router = createBrowserRouter(routes);