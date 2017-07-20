import APIKEY from './key'
const API_KEY = APIKEY();

export function comics(){
	return (
		[
			{ label: 'Annihilation' },
			{ label: 'Black Panther' },
			{ label: 'Black Widow' },
			{ label: 'Darth Vader' },
			{ label: 'Fantastic Four'},
			{ label: 'Hellcat' },
			{ label: 'Howard The Duck' },
			{ label: 'Spider-Man' },
			{ label: 'The Ultimates' },
			{ label: 'Vision' },
			{ label: 'X-Men' }
		]
	)
}

export async function getComics(value, cb){
	return setTimeout(cb, 500, await comicsRequest(value))
}

async function comicsRequest(value){
	let url = "https://gateway.marvel.com:443/v1/public/series?titleStartsWith=" + value + "&seriesType=ongoing&contains=comic&orderBy=-modified&limit=50&apikey=" + API_KEY
	let response = JSON.parse(await submitRequest(url))
	return comicsParse(response)
}

export async function submitSelection(value, id, cb){
	let url = "https://gateway.marvel.com:443/v1/public/series/" + id.toString() + "/comics?format=comic&formatType=comic&noVariants=true&orderBy=-onsaleDate&apikey=" + API_KEY
	let response = JSON.parse(await submitRequest(url))
	return setTimeout(cb, 500, await issueParse(response))
}

function submitRequest(url){
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest()
		xhr.open("GET", url)
		xhr.onload = () => resolve(xhr.responseText)
		xhr.onerror = () => reject(xhr.statusText)
		xhr.send()
	})
}

function comicsParse(data){
	let items = []
	let results = data.data.results
	for (let i = 0; i < results.length; i++){
		let obj = {}
		obj.label = results[i].title
		obj.id = results[i].id
		items.push(obj)
	}
	return items
}

function issueParse(data){
	let issue = data.data.results[0]
	let issueInfo = {}
	issueInfo.title = issue.title
	issueInfo.description = issue.description
	issueInfo.price = issue.prices[0].price
	issueInfo.image = issue.thumbnail.path + "." + issue.thumbnail.extension
	console.log(issueInfo)
	return issueInfo
}
