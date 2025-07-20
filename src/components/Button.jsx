export default function MyButton({count, onClick}) {
    return (
        <button onClick={onClick}>
          Count is {count}
        </button>
    )
}