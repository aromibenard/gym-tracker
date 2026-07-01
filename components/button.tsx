export default function Button({
    children,
    onClick,
    className = "",
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
         <button 
            type="submit" 
            className={`${className || 'relative group rounded-2xl transition-all duration-150 active:translate-y-[6px] disabled:cursor-not-allowed'}`} 
            disabled={props.disabled}
            onClick={onClick}
        >
            <div
                className={`
                absolute inset-0
                translate-y-[6px]
                rounded-lg
                bg-zinc-900 dark:bg-zinc-700
                `}
            />

            <div
              className={`
                relative z-10
                px-6 py-2
                rounded-lg
                font-semibold
                text-white
                bg-indigo-600
                border border-indigo-400/30
                transition-all duration-150
                
                group-hover:-translate-y-[1px]
                group-active:translate-y-[6px]
                disabled:bg-gray-400 disabled:border-gray-400/30 disabled:text-gray-200
            `}  
            >
                {children}
            </div>
        </button>
    );
}