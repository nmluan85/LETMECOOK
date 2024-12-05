import Picture from '../../assets/icons/picture.png';
import ClockIcon from '../../assets/icons/clock.png';
import CommentIcon from '../../assets/icons/comment.png';
const Item = ({ item }) => {
    return (
        <div className="bg-gray-100 rounded-lg shadow w-[250px]">
            <img src={Picture} alt="Snack cakes" className="w-full h-40 object-cover rounded-tl-lg rounded-tr-lg mb-4"/>
            <h3 className="text-lg font-bold mb-2">Snack cakes</h3>
            <div className="flex items-center justify-between text-gray-600 mb-2">
                <span><img className={ClockIcon}></img> 21 minutes</span>
                <span><i className="far fa-heart"></i> 23</span>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <i className="fas fa-star text-yellow-500"></i>
                    <i className="fas fa-star text-yellow-500"></i>
                    <i className="fas fa-star text-yellow-500"></i>
                    <i className="fas fa-star text-yellow-500"></i>
                    <i className="fas fa-star text-yellow-500"></i>
                </div>
                <i className="far fa-bookmark"></i>
            </div>
        </div>
    )
}

export default Item