// 包装函数
module.exports = function(grunt) {
	//目录设定
	var _config = {
		srcPath: 'src/',
		buildPath: 'dev/'
	};
	// 任务配置
	grunt.initConfig({
		cfg: _config,
		concat: {
		    css : {
				src: ['<%= cfg.srcPath %>css/reset.less', '<%= cfg.srcPath %>css/join.less'],
				dest: '<%= cfg.buildPath %>css/main.less'
		    },
		},
		less: {
			development: {
				options: {
				  	paths: ["<%= cfg.srcPath %>"]
				},
				files: {
				  	"<%= cfg.buildPath %>css/main.css": "<%= cfg.buildPath %>css/main.less"
				}
			}
		},
		uglify: {
			dev: {
				files: {
					'<%= cfg.buildPath %>js/main.min.js': ['<%= cfg.srcPath %>js/*.js']
				}
			}
		},
		connect: {
		  	server: {
		    	options: {
					port: 4000,
					base: 'build',
					hostname: '*'
		    	}
		  	}
		},
		copy: {
		  	main: {
		  		expand: true,
			    cwd: '<%= cfg.srcPath %>',
			    src: '**',
			    dest: '<%= cfg.buildPath %>'
		  	},
		},
		watch: {
			options: {
		      	livereload: true,
		    },
			all: {
				files: ['<%= cfg.srcPath %>**.*', '<%= cfg.srcPath %>**/**.*'],
				tasks: ['concat:css', 'copy:main','uglify:dev','less:development']
			}
		}
	});

	// 任务加载
	grunt.loadNpmTasks('grunt-contrib-concat'); 
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-connect');
	

	// 自定义任务
	grunt.registerTask('default', ['concat:css','copy:main','uglify:dev','less:development']);
	grunt.registerTask('dev', ['concat:css','copy:main','uglify:dev','less:development','connect:server','watch']);
};