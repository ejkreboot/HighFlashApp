
<div class="breadcrumb-container">
<div class="spacer"> </div>
<div class="breadcrumb">
    <slot />
</div>
</div>

<style>

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;800&display=swap');

/*** breadcrumb container ***/
.breadcrumb-container {
    background-color: rgb(245, 245, 245);
    box-shadow: 5px 5px 10px -4px #d9d9d9;
    display: flex;
    height: 30px; 
    padding: 0px;
    margin: 0px;
}

.spacer {
    background-color: var(--blue);
    width: 50px;
    height: 30px;
    margin: 0px;
    padding: 0px;
}

:global(.breadcrumb) {
    font-family: "Montserrat";
    margin: 0 auto 0 0;
    display: flex;
    flex-direction: row-reverse;
    flex-shrink: 9;
    width: fit-content;
    margin-bottom: 15px;
    position: relative;
    border-radius: 4px;
}

/*** breadcrumb items ***/
:global(.breadcrumb > div) {
    transition: all 0.2s ease-in-out;
    height: 30px;
    background: white;
    box-shadow: 0px 0px 18px -2px #d9d9d9;
    line-height: 30px;
    padding-left: 30px;
    padding-right: 10px;
    font-size: 12px;
    font-weight: 600;
    color: rgba(74, 74, 74, 0.8);
    position: relative;
    cursor: pointer;
    float: left;
}

:global(.breadcrumb > div:after) {
    transition: all ease-in-out 0.2s;
    content: "";
    position: absolute;
    left: calc(100% - 8px);
    top: 4px;
    z-index: 1;
    width: 0;
    height: 0;
    border: 11px solid #ffffff;
    border-left-color: transparent;
    border-bottom-color: transparent;
    box-shadow: 5px -5px 10px -4px #d9d9d999;
    transform: rotate(45deg);
    margin-left: -4px;
}

:global(.breadcrumb > div:last-child) {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    padding-left: 10px;
}

:global(.breadcrumb > div:first-child) {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    background-color: var(--orange);
    color: white;
}

:global(.breadcrumb > div:first-child:after) {
    content: "";
    display: none;
}

:global(.breadcrumb > div i) {
    margin-left: 5px;
    color: rgba(0, 0, 0, 0.2);
}

/*** hover breadcrumbs ***/
:global(.breadcrumb > div:hover) {
    background-color: var(--orange);
    filter: brightness(90%);
}

:global(.breadcrumb > div:hover:after) {
    border: 11px solid var(--orange);
    border-left-color: transparent;
    border-bottom-color: transparent;
}

:global(.breadcrumb > div:first-child:hover){
    filter: brightness(90%);
}

</style>