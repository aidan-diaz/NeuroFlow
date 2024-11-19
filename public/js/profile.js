
const deleteReactionScoreButtons = document.querySelectorAll('.deleteReactionScoreButton')

// function deleteReactionScore() {
//     console.log('works')
//         fetch('deleteReactionTestScore', {
//           method: 'delete',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg
//           })
//         }).then(function (response) {
//           window.location.reload()
//         })
// }


Array.from(deleteReactionScoreButtons).forEach(function(button) {
      button.addEventListener('click', function(){
        console.log('works')
        fetch('deleteReactionTestScore', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then(function (response) {
          window.location.reload()
        })
      });
});