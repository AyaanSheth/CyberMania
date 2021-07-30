import Image from 'next/image'

function Loading() {
    return (
        <centre style={{display: "grid", placeItems: "center", height: "100vh"}}>
            <div>
                <Image src="https://www.freepnglogos.com/uploads/whatsapp-logo-app-png-4.png" 
                height={200} 
                style={{marginBottom: 10}}
                />
            </div>
        </centre>
    )
}

export default Loading
