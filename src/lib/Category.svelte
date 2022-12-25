<script>
    export let number;
    export let category; 
    export let studying;
    export let mastered;
    export let total;
    export let root;

    if(total == 0) {
        mastered = 0;
    } else {
        mastered = Math.round(100 * (mastered / total));
    }
    
    if(number < 10) {
        number = "0" + number;
    }
</script>

<div class="item">
    <div class="number">{ number }</div>
        <div class="text-box">
            <div class="text">
                <span class="bold"><a href = {root + category}>{ category }</a></span>
                <span> ({ studying } of { total } active, { mastered }% mastered)</span>
        </div>
    </div>
</div>

<style>

@import url('https://fonts.googleapis.com/css2?family=Martian+Mono:wght@200;400;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;800&display=swap');

.item {
    width: 800px;
    display: flex;
    padding: 10px;
}

.number {
    width: 80px;
    height: 75px;
    padding-top: 7px;
    padding-right: 0px;
    margin-right: 20px;
    font-family: "Martian Mono";
    font-size: 40px;
    font-weight: 700;
    text-align: center;
    background-color: var(--orange);
    color: white;
    border-radius: 50%;
}


.text-box {
    margin-top: auto;
    margin-bottom: auto;
}

.text {
    font-family: "Montserrat";
    color: var(--gray);
    font-size: 18px;
    font-weight: 100;
    text-transform: uppercase;
}

.text .bold {
    font-family: "Montserrat";
    color: var(--orange);
    font-size: 25px;
    font-weight: 800;
    text-transform: lowercase;
}
</style>