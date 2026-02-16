import type { Photo } from "react-photo-album";
import { useNavigate } from "react-router-dom";
import './GallerySection.scss'

interface GallerySectionProps {
    imageKey: string
    eventTitle: string
    eventDate: Date
    allImages: Photo[]
    index: number
}

export const GallerySection = (props: GallerySectionProps) => {
    const displayDirection = props.index % 2 == 0 ? "row" : "row-reverse"
    const navigate = useNavigate();

    const navigateToGallery = () => {
        navigate(`/gallery/${props.imageKey}`)
    }

    console.log(props.imageKey, '<<< gallery section key')

    return (
        <button className="gallery-section-container" onClick={navigateToGallery}>
            <div
                className="gallery-section-images-container"
                style={{flexDirection: displayDirection}}
            >
                <div className="gallery-section-small-images-container">
                    {props.allImages[1] ? <img className="gallery-section-small-image" src={props.allImages[1].src}/> : null}
                    {props.allImages[2] ? <img className="gallery-section-small-image" src={props.allImages[2].src}/> : null}
                </div>
                <img className="gallery-section-large-image" src={props.allImages[0].src}/>
            </div>
            <div className="gallery-section-title">{props.eventTitle} - {props.eventDate.toLocaleDateString('default', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            })}</div>
        </button>
    )
}

// function setState(arg0: { imageIsReady: boolean; }) {
//     throw new Error("Function not implemented.");
// }
