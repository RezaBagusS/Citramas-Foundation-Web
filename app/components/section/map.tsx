const Map = () => {
    return (
        <div className="cust-container py-10 border-t-2">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.0692883675797!2d104.134985!3d1.1102429999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d9866ffffffffb%3A0x3f6cd21ed5da4ef1!2sCitramas%20Foundation!5e0!3m2!1sid!2sid!4v1708316456981!5m2!1sid!2sid"
                className="w-full"
                height="450"
                style={{ border: 1 }}
                allowFullScreen
                loading="lazy"
            ></iframe>
        </div>
    )
}

export default Map;