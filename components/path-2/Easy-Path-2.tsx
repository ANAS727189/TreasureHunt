import Image from "next/image"
import Link from "next/link"

const EasyPath2 = () => {
  return (
    <Link
            href="/candidate-dashboard-portal-cards/ye-to-kar-looge-tum"
            className="flex flex-col h-full bg-green-50 hover:bg-green-100 rounded-lg shadow-sm border border-green-200 transform hover:-translate-y-1 transition-all overflow-hidden"
          >
            <Image src="/memes/chillguy.png" alt="This is fine meme" width={400} height={200} className="w-full h-48 object-cover"/>
            <div className="p-6 grow">
              <h2 className="text-2xl font-semibold text-green-800 mb-2">
                Daro mat ye asan hai.
              </h2>
              <p className="text-green-700">
                Yaha referal milta hai direct job ke liye.
              </p>
            </div>
            <footer className="p-6 pt-2 text-sm text-gray-500 border-t border-green-100">
              <strong>Last Updated:</strong> Jab Open source Open Source tha apna college ka playground nahi<br/>
              <strong>Author:</strong> Sapna College<br/>
              <strong>Views:</strong> MacroHard Waali Didi
            </footer>
    </Link>
  )
}

export default EasyPath2