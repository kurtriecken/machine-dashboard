export default function MyButton({count, onClick}) {
    return (
        <button onClick={onClick}>
          count countovsky is {count}
        </button>
    )
}