/**
 * -------------------
 * Aliases in GraphQL
 * -------------------
 * If you have a sharp eye, you may have noticed that, since the result object fields match the name 
 * of the field in the query but don't include arguments, you can't directly query for the same field 
 * with different arguments. That's why you need aliases - they let you rename the result of a field 
 * to anything you want.
 */
{
    empireHero: hero(episode: EMPIRE) {
        name
    }
    jediHero: hero(episode: JEDI) {
        name
    }
}

// Output of above query is:

{
    "data": {
        "empireHero": {
            "name": "Luke Skywalker"
        },
        "jediHero": {
            "name": "R2-D2"
        }
    }
}

/**
 * In the above example, the two hero fields would have conflicted, but since we can alias them 
 * to different names, we can get both results in one request.
 */