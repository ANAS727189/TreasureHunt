import Image from "next/image"
import Link from "next/link"

const EasyPath3 = () => {
  return (
<Link
            href="/candidate-dashboard-portal-cards/ye-nahi-kar-paaoge-tum"
            className="flex flex-col h-full bg-green-50 hover:bg-green-100 rounded-lg shadow-sm border border-green-200 transform hover:-translate-y-1 transition-all overflow-hidden"
          >
            <Image src="/memes/iit_dholakpur.png" alt="This is fine meme" width={400} height={200} className="w-full h-48 object-cover"/>
            <div className="p-6 grow">
              <h2 className="text-2xl font-semibold text-green-800 mb-2">
                Daro ye asan nahi hai.
              </h2>
              <p className="text-green-700">
                Yaha &apos;we will connect with you soon&apos; milta hai.
              </p>
            </div>
            <footer className="p-6 pt-2 text-sm text-gray-500 border-t border-green-100">
              <strong>Last Updated:</strong>Jab Chatgpt nahi tha<br/>
              <strong>Author:</strong>Alakh Daddy<br/>
              <strong>Views:</strong>Bot lagye views ke liye label ka worker
            </footer>
    </Link>
  )
}

export default EasyPath3