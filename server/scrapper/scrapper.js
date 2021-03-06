var request = require('request');
var cheerio = require('cheerio');
var rp = require('request-promise');
var Product = require("../models/product");

module.exports.scrap = function() {
var options = {
        method: 'GET',
        url: 'https://www.cultbeauty.co.uk',
        json: true,
        headers: {
            'Connection': 'keep-alive',
            'Accept-Encoding': '',
            'Accept-Language': 'en-US,en;q=0.8'
        }
    };

rp(options)
    .then(function (htmlString) {
        // Process html...
        var $ = cheerio.load(htmlString);
		var allItems_bestSelling = $(".bestselling").children().eq(0).children().eq(1).children().eq(0).children();
		var items_bestSelling = [];
		
		allItems_bestSelling.each(function(index1) {
			// get BestSelling products details page links
			let tmp = {};
			tmp.url = $(".bestselling").children().eq(0).children().eq(1).children().eq(0).children().eq(index1).find('a').attr("href");

			var optionsBest = {
        		method: 'GET',
    		    url: `https://www.cultbeauty.co.uk` + tmp.url,
    		    json: true,
    		    headers: {
    		        'Connection': 'keep-alive',
    		        'Accept-Encoding': '',
    		        'Accept-Language': 'en-US,en;q=0.8'
    		    }
    		};
    		// load details page html
    		rp(optionsBest)
    			.then(function (htmlStringBest) {
					var $ = cheerio.load(htmlStringBest);
					// sort revelant informations
						tmp.brand = $(".productHeaderContainer").children().eq(0).find('.productBrandTitle').text();
						tmp.title = $(".productHeaderContainer").children().eq(0).find('.productTitle').text();
						tmp.price = $(".productHeaderContainer").children().eq(0).find('.productPrice').text() + $(".productHeaderContainer").children().eq(0).find('.productCurrency').text();
						tmp.picture = $(".productDataContainer").children().eq(0).find('img').attr("src");
						tmp.description = $(".productInfo").children().eq(0).children().eq(1).find('p').text();
						tmp.ingredientList = $(".productInfo").children().eq(0).children().eq(3).find('p').text();
					// create object in database
						var new_product = new Product({
							title: tmp.title,
							description: tmp.description,
							brand: tmp.brand,
							price: tmp.price,
							picture: tmp.picture,
							ingredientList: tmp.ingredientList,
							type: 'best'
						})
					
						new_product.save(function (error) {
							if (error) {
								console.log(error)
							}
							
						})
				})
			 	.catch(function (err) {
    		   		// Crawling failed...
    		        console.log('err', err);
		
    		});
			
				items_bestSelling.push(tmp)
		});


		// Process html...
		var allItems_trending = $(".trending").children().eq(0).children().eq(1).children().eq(0).children();
		var items_trending = [];
		
		allItems_trending.each(function(index2) {
			// get Trend products details page links
			let tmp = {};
			tmp.url = $(".trending").children().eq(0).children().eq(1).children().eq(0).children().eq(index2).find('a').attr("href");

			var optionsTrend = {
        		method: 'GET',
    		    url: `https://www.cultbeauty.co.uk` + tmp.url,
    		    json: true,
    		    headers: {
    		        'Connection': 'keep-alive',
    		        'Accept-Encoding': '',
    		        'Accept-Language': 'en-US,en;q=0.8'
    		    }
    		};
    		// load details page html
    		rp(optionsTrend)
    			.then(function (htmlStringTrend) {
					var $ = cheerio.load(htmlStringTrend);
					// sort revelant informations
						tmp.brand = $(".productHeaderContainer").children().eq(0).find('.productBrandTitle').text();
						tmp.title = $(".productHeaderContainer").children().eq(0).find('.productTitle').text();
						tmp.price = $(".productHeaderContainer").children().eq(0).find('.productPrice').text() + $(".productHeaderContainer").children().eq(0).find('.productCurrency').text();
						tmp.picture = $(".productDataContainer").children().eq(0).find('img').attr("src");
						tmp.description = $(".productInfo").children().eq(0).children().eq(1).find('p').text();
						tmp.ingredientList = $(".productInfo").children().eq(0).children().eq(3).find('p').text();
					// create object in database
						var new_product = new Product({
							title: tmp.title,
							description: tmp.description,
							brand: tmp.brand,
							price: tmp.price,
							picture: tmp.picture,
							ingredientList: tmp.ingredientList,
							type: 'trend'
						})
					
						new_product.save(function (error) {
							if (error) {
								console.log(error)
							}
							
						})
						//console.log("hey:", tmp);
				})
			 	.catch(function (err) {
    		   		// Crawling failed...
    		        console.log('err', err);
		
    		});
			
				items_trending.push(tmp)
		});
    })
    .catch(function (err) {
        // Crawling failed...
                console.log('err', err);

    });
}