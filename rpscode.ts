class Player
{
    private name: string;
    private health: number;
    private resultHand: string;

    constructor(name: string, health: number, resultHand: string)
    {
        this.name = name;
        this.health = health;
        this.resultHand = resultHand;
    }

    // Get 
    get gName(): string { return this.name; }
    get ghealth(): number { return this.health; }
    get gResultHand(): string { return this.resultHand;}

    // Set
    set sName(name: string) { this.name = name; }
    set shealth(health: number) { this.health = health; }
    set sResultHand(resultHand: string) { this.resultHand = resultHand; }

    // 
    public PrintHealth() {
        alert(this.name + "의 체력 : " + this.health);
    }

    public ResultHand() {
        alert(this.name + "의 가위바위보 결과 : " + this.resultHand);
    }

    public TakeHand(resultHand : string) {
        this.resultHand = resultHand;
    }

    public RndHand() {
        let rps : string[] = ["가위","바위","보"];
        let rnd : number = Math.floor(Math.random() * (2 - 0)) + 0;

        this.resultHand = rps[rnd];
    }

    public ResetHand() {
        this.resultHand = "빈손";
    }


    public TakeDamage() {
        return this.health--;
    }
}

class VDT
{
    private you : Player;
    private cpu : Player;

    constructor (you : Player, cpu : Player)
    {
        this.you = you;
        this.cpu = cpu;
    }

    public VictoryDefeatTie()
    {
        switch (this.you.gResultHand)
        {
            case "가위":
            {
                if (this.cpu.gResultHand === "가위") {
                    alert("Tie!");
                } else if (this.cpu.gResultHand === "바위") {  
                    alert(this.you.gName + " Defeat!");
                    this.you.TakeDamage();
                } else if (this.cpu.gResultHand === "보") {
                    alert(this.you.gName + " Victory!");
                    this.cpu.TakeDamage();
                }
                break;
            }

            case "바위":
            {
                if (this.cpu.gResultHand === "가위") {
                    alert(this.you.gName + " Victory!");
                    this.cpu.TakeDamage();
                } else if (this.cpu.gResultHand === "바위") {  
                    alert("Tie!");
                } else if (this.cpu.gResultHand === "보") {
                    alert(this.you.gName + " Defeat!");
                    this.you.TakeDamage();
                }
                break;
            }

            case "보":
            {
                if (this.cpu.gResultHand === "가위") {
                    alert(this.you.gName + " Defeat!");
                    this.you.TakeDamage();
                } else if (this.cpu.gResultHand === "바위") {  
                    alert(this.you.gName + " Victory!");
                    this.cpu.TakeDamage();
                } else if (this.cpu.gResultHand === "보") {
                    alert("Tie!");
                }
                break;
            }
            
            default:
            {
                alert("잘못 입력되었습니다. 다음 턴에 다시 시도하십시오.");
                break;
            }
        }
    }

    public EndResult() : boolean
    {
        if (this.you.ghealth <= 0)
        {
            alert(this.cpu.gName + "의 승리!");
            return false;
        }

        if (this.cpu.ghealth <= 0)
        {
            alert(this.you.gName + "의 승리!");
            return false;
        }

        return true;
    }
}

function Tick()
{
    const you: Player = new Player("플레이어",1,"빈손");
    const cpu: Player = new Player("상대방",1,"빈손");

    const vdt : VDT = new VDT(you,cpu);
    const players : Player[] = [you,cpu];

    while (vdt.EndResult())
    {
        let rpsCom : any = prompt("가위바위..","보!");
        console.log(rpsCom);

        players[0].TakeHand(rpsCom);
        players[1].RndHand();

        for (let i = 0 ; i < 2; i++) {
            players[i].ResultHand();     
        }

        vdt.VictoryDefeatTie();

        for (let i = 0 ; i < 2; i++) {
            players[i].PrintHealth();
            players[i].ResetHand();
        }
    }
}

Tick();