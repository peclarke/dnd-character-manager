const ErrorElement = () => {
    return (
        <section style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
            flexDirection: 'column'
        }}>
            <h2>You navigated somewhere wrong. Take a look at your URL</h2>
            <span>Or click <a href="/" style={{color: "green", textDecoration: "underline"}}>here</a> to get back to safety</span>
        </section>
    )
}

export default ErrorElement;