// export function InputBox({label, placeholder}) {
//     return <div>
//       <div className="text-sm font-medium text-left py-2">
//         {label}
//       </div>
//       <input placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200" />
//     </div>
// }


// Update your InputBox component to support controlled inputs
export function InputBox({ label, placeholder, onChange, type = "text", value }) {
    return <div>
        <div className="text-sm font-medium text-left py-2">
            {label}
        </div>
        <input 
            onChange={onChange}
            type={type}
            placeholder={placeholder} 
            value={value}
            className="w-full px-2 py-1 border rounded border-slate-200" 
        />
    </div>
}