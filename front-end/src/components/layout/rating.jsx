import { FaStar } from 'react-icons/fa';
const Rating = () => {
    return (
        <div class="flex items-center mt-2 justify-end">
            <span class="text-yellow-400">
                <FaStar />
            </span>
            <span class="text-yellow-400">
                <FaStar />
            </span>
            <span class="text-yellow-400">
                <FaStar />
            </span>
            <span class="text-yellow-400">
                <FaStar />
            </span>
            <span class="text-gray-300">
                <FaStar />
            </span>
        </div>
    )
}
export default Rating;