import { useState, useEffect } from 'react';

export default function ImageCarousel() {
    const images = [
        '/3_Leches.png',
        '/Mil_Hojas.jpg',
        '/fiesta.JPG'
    ];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [prevImageIndex, setPrevImageIndex] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setPrevImageIndex(currentImageIndex); // Guardar el índice de la imagen anterior
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [currentImageIndex, images.length]);

    return (
        <div className="flex justify-center items-center w-full h-full py-20">
            <div className="relative w-full max-w-screen-lg h-64 sm:h-80 md:h-96 lg:h-[32rem] overflow-hidden rounded-lg shadow-lg">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className={`absolute top-0 left-0 w-full h-full object-cover transition-transform duration-1000 ease-in-out ${
                            index === currentImageIndex
                                ? 'transform translate-x-0 scale-100 opacity-100'
                                : index === prevImageIndex
                                ? 'transform -translate-x-full scale-75 opacity-0'
                                : 'hidden'
                        } ${
                            index === currentImageIndex
                                ? 'animate-slideIn'
                                : index === prevImageIndex
                                ? 'animate-slideOut'
                                : ''
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}




