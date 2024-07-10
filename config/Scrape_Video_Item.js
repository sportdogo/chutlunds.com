
export function Scrape_Video_Item($) {


    const finalDataArray = [];

    $('.main_results .video-item').each((i, el) => {
        const thumbnail = $(el).find('picture img').attr('data-src');
        const title = $(el).find('picture img').attr('alt');
        const duration = $(el).find('.l').text();

        const views = $(el).find('.stats .v').text().trim();
        const likePercentage = $(el).find('.stats .r').text().trim();
        const uploadedTime = $(el).find('.stats .d').text().trim();
        const videoBadge = $(el).find('.video-badge.h').text().trim();

        const previewVideo = $(el).find('picture img').attr('data-preview');
        const href = `https://spankbang.com${$(el).find('a').attr('href')}`;

        if (href !== undefined && previewVideo !== undefined && !thumbnail.includes("//assets.sb-cd.com")) {
            finalDataArray.push({
                thumbnail: thumbnail,
                title: title,
                duration: duration,
                views: views,
                likePercentage: likePercentage,
                uploadedTime: uploadedTime,
                videoBadge: videoBadge,
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

            const views = $(el).find('.stats .v').text().trim();
            const likePercentage = $(el).find('.stats .r').text().trim();
            const uploadedTime = $(el).find('.stats .d').text().trim();
            const videoBadge = $(el).find('.video-badge.h').text().trim();

            const previewVideo = $(el).find('picture img').attr('data-preview');
            const href = `https://spankbang.com${$(el).find('a').attr('href')}`;

            if (href !== undefined && previewVideo !== undefined && !thumbnail.includes("//assets.sb-cd.com")) {
                finalDataArray.push({
                    thumbnail: thumbnail,
                    title: title,
                    duration: duration,
                    views: views,
                    likePercentage: likePercentage,
                    uploadedTime: uploadedTime,
                    videoBadge: videoBadge,
                    previewVideo: previewVideo,
                    href: href,
                });
            }
        });
    }


    return finalDataArray;
}


