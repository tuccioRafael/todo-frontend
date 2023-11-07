import { Layout, Button } from 'antd';
import { NavbarStyle } from './NavbarStyle';
const { Header } = Layout;

export const Navbar = ({ onClick }) => {

    return (
        <NavbarStyle>
            <Header className='header'>
                <Button onClick={onClick}>Criar uma tarefa</Button>
            </Header>
        </NavbarStyle>
    )
}