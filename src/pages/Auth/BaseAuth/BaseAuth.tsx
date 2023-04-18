import './BaseAuth.css';

interface BaseAuthProps {
    children: React.ReactNode
}

const BaseAuth = (props: BaseAuthProps) => <section className="auth-form">{props.children}</section>;

export default BaseAuth;
