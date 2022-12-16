<script>
    import { onMount } from 'svelte';
    import Breadcrumb from '$lib/Breadcrumb.svelte';
    import Category from '$lib/Category.svelte';

    
    async function get_categories () {
        const url = '/api/user/performance/';
        const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
        })
        return(await response.json());
    }

  let categories = [];

  onMount(() => {
      get_categories().then(e => { categories = e });
  })

</script>


<Breadcrumb>
    <div>Learning Home</div>
</Breadcrumb>
  
<main class="container">

    <h1>welcome to the learning center.</h1>

    <p>Our personalized learning platfrom uses a variation on the <a href="https://super-memory.com/english/ol/sm2.htm">Super Memo SM2 algorithm</a>
        to maximize retention via spaced repetition based on your past performance. Spaced repetition is an evidence based learning methodology<sup>1,2,3</sup> that 
        improves retention over simple bulk learning. While our system is designed to allow you to review the material in a single session for as 
        long as you wish (emphasizing material that you are having the most difficulty recalling), learning follows the law of diminishing returns
        over the course of a single session. Therefore, it is recommended to revisit this material multiple times over the course of days and weeks to optimize retention.</p>
    <p>
        Select the flash card set you wish to review from the following options.
    </p>
    {#each categories as cat, i}
    <Category root="/protected/study/"
            number={i+1} 
            category={cat.category} 
            total={cat.total_cards} 
            studying={cat.studying}
            mastered={cat.mastered}/>
    {/each}

    <br>
    <br>
    <b>References:</b>
    <small>
        <br>
        <br>
        <ol>
            <li> Augustin M. (2014). How to learn effectively in medical school: test yourself, learn actively, and repeat in intervals. The Yale journal of biology and medicine, 87(2), 207–212. </li>
            <li> Hopkins, R.F., Lyle, K.B., Hieb, J.L. & Ralston, P.A.S. (2015) Spaced Retrieval Practice Increases College Students’ Short- and Long-Term Retention of Mathematics Knowledge, Educational Psychology Review, 28(4), pp. 853-873. </li>
            <li> Voice, A., & Stirton, A. 2020 Jan 15. Spaced Repetition: towards more effective learning in STEM. New Directions in the Teaching of Physical Sciences. [Online] 0:15 </li>        
        </ol>
    </small>
</main>