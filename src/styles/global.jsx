import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body{
        position: relative;
        width: 100%;
        height: 100vh;
        font-family: sans-serif;
        /* background: #2029ef; */
    }

    body #root{
        width: 100%;
        height: 100vh;
    }
`