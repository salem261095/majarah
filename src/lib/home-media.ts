export type { VideoDirectory } from './assets';

// Placeholder client names for the approved frontend presentation.
export const selectedWork=[
 {slug:'gift-details',mobile:{media:'anah-study',directory:'portrait' as const},client:'دار نُوّار',media:'invitation-detail',directory:'editorial' as const,title:'الحكاية في أدقّ تفاصيلها.',sector:'العلامات والضيافة',tags:['إنتاج بصري','تفاصيل','إخراج فني'],description:'الضوء والخامة واللمسة الأخيرة. مشهد من مكتبة إنتاج مجرّة.'},
 {slug:'craft-film',mobile:{media:'max-fitness',directory:'portrait' as const},client:'رِواق',media:'monochrome-craft',directory:'editorial' as const,title:'للصورة لغتها.',sector:'الإنتاج الإبداعي',tags:['فيلم','تصوير','حِرفة'],description:'تكوينات بالأبيض والأسود، تقترب من الحِرفة وما وراء الصورة.'},
 {slug:'hospitality-film',mobile:{media:'buters-festival',directory:'portrait' as const},client:'مذاق',media:'cafe-conversation',directory:'editorial' as const,title:'لحظات قريبة من الناس.',sector:'الأطعمة والضيافة',tags:['محتوى','ضيافة','حكاية'],description:'تفاصيل المكان والناس في مشهد من مكتبة مجرّة البصرية.'},
 {slug:'workspace-study',mobile:{media:'buters-outdoor',directory:'portrait' as const},client:'مدار للأعمال',media:'modern-workspace',directory:'showcase' as const,title:'مساحة لمنظور جديد.',sector:'الأعمال والمساحات',tags:['إنتاج بصري','المكان','اتصال العلامة'],description:'مشهد من المكتبة البصرية يستكشف علاقة الناس بالمكان.'},
];

export const reelTiles=[
 {name:'pasta-craft',portrait:true},{name:'lantern-story',portrait:false},{name:'training-moment',portrait:true},
 {name:'beads-detail',portrait:true},{name:'monochrome-craft',portrait:false},{name:'hospitality-arrival',portrait:true},
 {name:'saffron-table',portrait:false},{name:'invitation-detail',portrait:false},{name:'cafe-conversation',portrait:false},
];

export const heroFilms=['pasta-craft','training-moment','beads-detail','hospitality-arrival','burger-craft','neon-fries'] as const;
export const creativeServiceMedia=[
 {name:'monochrome-craft',landscape:{name:'falcon-heritage',directory:'showcase'}},
 {name:'pasta-craft',landscape:{name:'samosa-detail',directory:'showcase'}},
 {name:'training-moment',landscape:{name:'gaming-session',directory:'showcase'}},
 {name:'hospitality-arrival',landscape:{name:'shawarma-craft',directory:'showcase'}},
] as const;

export type SelectedWorkProject=(typeof selectedWork)[number];
export function selectedWorkSource(project:SelectedWorkProject,mobile:boolean){
 return mobile?project.mobile:{media:project.media,directory:project.directory};
}
