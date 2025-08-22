import { renderLanding } from "./pages/landing";
import { loginPage } from "./pages/login";
import renderRegister from "./pages/register";

let app = document.getElementById('app')
let routes = {
    '/artemisa/landing': () => renderLanding(app),
    '/artemisa/login': () => loginPage(app),
    '/artemisa/register': () => renderRegister(app)
}

export let renderRouter = () => {

    let path = window.location.pathname;

    if (path === '/' || !path) {
        history.pushState(null, null, '/artemisa/landing');
        path = '/artemisa/landing'; // actualizamos manualmente para que coincida
    }


    path = window.location.pathname;

    if (routes[path]) {
        routes[path]();
    }
    else {
        app.innerHTML = `
        <header>
            <nav>
                <a href="/artemisa/home" data-link>Home</a>
                <a href="/artemisa/login" data-link>Log in</a>
                <a href="/artemisa/register" data-link>Sign up</a>
            </nav>
        </header>

        <main>
            <h1>HTTP NOT FOUND</h1>

        </main>
        
        `

    }

}