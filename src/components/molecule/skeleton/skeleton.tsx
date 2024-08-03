export default function Skeleton() {
  return (
    <div className="border shadow rounded-md p-4 max-w-max h-[200px]">
      <div className="animate-pulse flex  gap-3 flex-col">
        <div className="bg-slate-700 w-24 h-28 rounded-md"></div>
        <div className=" gap-2 flex flex-col m-0">
          <div className="h-3 bg-slate-700 rounded"></div>
          <div className="h-3 bg-slate-700 rounded"></div>
        </div>
      </div>
    </div>
  );
}
