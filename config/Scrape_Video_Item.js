


export function Scrape_Video_Item($) {


    const finalDataArray = [];

    $('.main_results .video-item').each((i, el) => {

        const thumbnail = $(el).find('picture img').attr('data-src');
        const title = $(el).find('picture img').attr('alt');
        const duration = $(el).find('.l').text();

        const statsText = $(el).find('.stats').text();
        const likePercentage = statsText.substring(statsText.indexOf("%") - 4, statsText.indexOf("%") + 1).trim();
        const views = statsText.substring(0, statsText.indexOf("%") - 4).trim();

        const previewVideo = $(el).find('picture img').attr('data-preview');
        const href = `https://spankbang.com${$(el).find('a').attr('href')}`;

        if (href !== undefined && previewVideo !== undefined && !thumbnail.includes("//assets.sb-cd.com")) {
            finalDataArray.push({
                thumbnail: thumbnail,
                title: title,
                duration: duration,
                likePercentage: likePercentage,
                views: views,
                previewVideo: previewVideo,
                href: href,
            });
        }
    });
    if (finalDataArray.length == 0) {
        $('.video-item').each((i, el) => {

            const thumbnail = $(el).find('picture img').attr('data-src');
            const title = $(el).find('picture img').attr('alt');
            const duration = $(el).find('.l').text();

            const statsText = $(el).find('.stats').text();
            const likePercentage = statsText.substring(statsText.indexOf("%") - 4, statsText.indexOf("%") + 1).trim();
            const views = statsText.substring(0, statsText.indexOf("%") - 4).trim();

            const previewVideo = $(el).find('picture img').attr('data-preview');
            const href = `https://spankbang.com${$(el).find('a').attr('href')}`;

            if (href !== undefined && previewVideo !== undefined && !thumbnail.includes("//assets.sb-cd.com")) {
                finalDataArray.push({
                    thumbnail: thumbnail,
                    title: title,
                    duration: duration,
                    likePercentage: likePercentage,
                    views: views,
                    previewVideo: previewVideo,
                    href: href,
                });
            }
        });
    }


    return finalDataArray;
}


