const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'frontend', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

const imageMap = {
  'Front End Development': 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2000',
  'Frontend Development': 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2000',
  'Back End Development': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000',
  'Backend Development': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000',
  'Java Programming': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2000',
  'Java Development': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2000',
  'Python Programming': 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=2000',
  'Python Development': 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=2000',
  'Web Development': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2000',
  'Cybersecurity': 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2000',
  'Artificial Intelligence': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000',
  'UI/UX Design': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000',
  'Data Science': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000',
  'Machine Learning': 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=2000',
  'Quantum Computing': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2000',
  'Problem Solving Using DSA': 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2000',
  'DSA': 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2000'
};

for (const [key, url] of Object.entries(imageMap)) {
  const regex1 = new RegExp(`<img[^>]*?src="([^"]*?)"[^>]*?alt="${key}"`, 'gi');
  const regex2 = new RegExp(`<img[^>]*?alt="${key}"[^>]*?src="([^"]*?)"`, 'gi');
  
  html = html.replace(regex1, (match, p1) => {
    console.log('Replaced:', match);
    return match.replace(`src="${p1}"`, `src="${url}"`);
  });
  
  html = html.replace(regex2, (match, p1) => {
    console.log('Replaced:', match);
    return match.replace(`src="${p1}"`, `src="${url}"`);
  });
}

// Ensure the local paths also get replaced just in case the alt matching failed
html = html.replace(/src="\.\/course_image\/fr_banner\.jpg"/g, `src="${imageMap['Front End Development']}"`);
html = html.replace(/src="\.\/course_image\/ba_banner\.webp"/g, `src="${imageMap['Back End Development']}"`);
html = html.replace(/src="course_image\/java_banner\.jpg"/g, `src="${imageMap['Java Programming']}"`);
html = html.replace(/src="\.\/course_image\/python_banner\.webp"/g, `src="${imageMap['Python Programming']}"`);
// And picsum ones just to be safe
html = html.replace(/src="https:\/\/picsum\.photos\/seed\/gk-webdev\/600\/400"/g, `src="${imageMap['Web Development']}"`);
html = html.replace(/src="https:\/\/picsum\.photos\/seed\/gk-cybersecurity\/600\/400"/g, `src="${imageMap['Cybersecurity']}"`);
html = html.replace(/src="https:\/\/picsum\.photos\/seed\/gk-ai\/600\/400"/g, `src="${imageMap['Artificial Intelligence']}"`);
html = html.replace(/src="https:\/\/picsum\.photos\/seed\/gk-uiux\/600\/400"/g, `src="${imageMap['UI/UX Design']}"`);
html = html.replace(/src="https:\/\/picsum\.photos\/seed\/gk-datascience\/600\/400"/g, `src="${imageMap['Data Science']}"`);
html = html.replace(/src="https:\/\/picsum\.photos\/seed\/gk-ml\/600\/400"/g, `src="${imageMap['Machine Learning']}"`);
html = html.replace(/src="https:\/\/picsum\.photos\/seed\/gk-quantum\/600\/400"/g, `src="${imageMap['Quantum Computing']}"`);
html = html.replace(/src="https:\/\/picsum\.photos\/seed\/gk-dsa\/600\/400"/g, `src="${imageMap['DSA']}"`);


fs.writeFileSync(filePath, html, 'utf8');
console.log('Done replacing images in index.html');
