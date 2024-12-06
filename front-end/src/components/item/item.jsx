import Picture from '../../assets/icons/picture.png';
import ClockIcon from '../../assets/icons/clock.png';
import CommentIcon from '../../assets/icons/comment.png';
import HeartIcon from '../../assets/icons/heart.png';
import BookmarkIcon from '../../assets/icons/bookmark.svg';
const Item = ({ item }) => {
    return (
        <div className="bg-gray-100 rounded-lg shadow w-[260px]">
            <img src={Picture} alt="Recipe Image" className="w-full h-40 object-cover rounded-tl-lg rounded-tr-lg mb-2"/>
            {/* <h3 className="text-lg text-left pl-2 font-bold mb-2 max-w-xs">Snack cakes Snack cakesSnack cakesSnack cakesSnack cakesSnack cakes</h3> */}
            <div className="text-left font-medium mb-2 pl-2">
                <h3 className="truncate-multiline">
                    This is a long text that will be truncated after two lines. The text will show the first two lines, and the rest will be hidden with an ellipsis at the end. Even if the content exceeds, it won't show more than two lines of text.
                </h3>
            </div>
            <div className="flex flex-col justify-between text-gray-600 mb-2 pl-2">
                <span className="flex items-center">
                    <img src={ClockIcon} alt="Clock Icon" className="h-4 w-4 mr-2"></img> 
                    <div className="bg-gray-200 rounded-full px-2 py-1 text-xs primary-color font-medium">
                        21 minutes
                    </div>
                    <div class="w-9 h-9 border-2 border-primary-default rounded-full bg-transparent ml-auto mr-4 flex items-center justify-center hover:border-primary-600 group">
                        <img src={BookmarkIcon} alt="Bookmark Icon" className="w-5 h-5 fill-gray-600"></img>
                    </div>
                    
                    
                </span>
                <span className="flex items-center">
                    <div className="flex justify-between text-gray-600 mb-2">
                        <span className="flex items-center pr-2">
                            <img src={CommentIcon} alt="Comment Icon" className="h-4 w-4 mr-2"></img>
                            <div className="bg-gray-200 rounded-full px-3 py-1 text-xs primary-color font-medium">
                                32 
                            </div>
                        </span>
                        <span className="flex items-center">
                            <img src={HeartIcon} alt="Heart Icon" className="h-4 w-4 mr-2"></img>
                            <div className="bg-gray-200 rounded-full px-3 py-1 text-xs primary-color font-medium">
                                21
                            </div>
                        </span>
                    </div>
                </span>
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