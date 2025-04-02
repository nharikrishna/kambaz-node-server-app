export default function QueryParameters(app) {
    app.get("/lab5/calculator", (req, res) => {
        const { operation } = req.query
        const [a, b] = [parseInt(req.query.a), parseInt(req.query.b)];
        let result = 0
        switch (operation) {
            case "add":
                result = a + b
                break
            case "subtract":
                result = a - b
                break
            case "multiply":
                result = a * b
                break
            case "divide":
                if (b === 0) {
                    result = "B cannot be zero"
                    break
                }
                result = a / b
                break
            default:
                result = "Invalid operation"
        }
        res.send(result.toString())
    })
}