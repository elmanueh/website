interface CocSearchProps {
  callback: (clanTag: string) => void
}

export default function CocSearch(props: CocSearchProps) {
  const handleSearch = () => {
    const clanTag = (document.getElementById('coc-tag') as HTMLInputElement)
      ?.value
    props.callback(clanTag)
  }

  return (
    <div className="border-0 rounded-2xl px-2 sm:px-20 py-5 w-max bg-gray-700">
      <h1 className="text-2xl pb-4 font-medium">
        Consultar información sobre un{' '}
        <span className="text-purple-300 font-bold">clan</span>
      </h1>
      <div className="flex gap-3 justify-center">
        <input
          id="coc-tag"
          type="text"
          defaultValue="#2G00G8RP8"
          placeholder="#2G00G8RP8"
          className="p-1 w-34 rounded-2xl pl-3 font-medium border"
        />
        <button
          className="px-3 font-bold text-gray-800 bg-purple-300 border rounded-lg cursor-pointer"
          onClick={handleSearch}
        >
          BUSCAR
        </button>
      </div>
    </div>
  )
}
