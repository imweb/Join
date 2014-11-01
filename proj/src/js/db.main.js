//当前的DB
;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['db'], factory);
    } else {
        root['DB'] = factory(root['DB']);
    }
}(this, function (DB) {
    DB.extend( {
	    applyFree: DB.httpMethod({ url: '/cgi-bin/apply_course_sect', type: 'POST', noNeedLogin: true }),
	    get_datas: DB.httpMethod({ url: '/cgi-bin/famousVLecture/getVLectureInfo'}),
        post_invite: DB.httpMethod({ url: '/cgi-bin/famousVLecture/inviteFamouser',type: 'POST'}),
        post_join: DB.httpMethod({ url: '/cgi-bin/famousVLecture/applyVLecture',type: 'POST'})
    });
    return DB;
}));